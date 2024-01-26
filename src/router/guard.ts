import { CacheEnum } from '@/enum/cacheEnum'
import { storage } from '@/utils'
import getPageTitle from '@/utils/getPageTitle'
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { RouteLocationNormalized, Router } from 'vue-router'

NProgress.configure({ showSpinner: false })

class Guard {
  constructor(private router: Router) {}
  public run() {
    this.router.beforeEach(this.beforeEach.bind(this))
    this.router.afterEach(this.afterEach.bind(this))
    this.router.onError(this.onError.bind(this))
  }

  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    NProgress.start()
    document.title = getPageTitle(to.meta.menu?.title!)
    if (to.name !== 'login' && !this.token()) {
      storage.set(CacheEnum.REDIRECT_ROUTE_NAME, to.path)
      return { name: 'login' }
    }
    if (to.meta.guest && this.token()) return from
  }

  private afterEach() {
    NProgress.done()
  }

  private onError(error: any) {
    NProgress.done()
    // ElNotification.error({
    //   title: '路由錯誤',
    //   message: error.message,
    // })
  }

  private token(): string | null {
    return storage.get(CacheEnum.TOKEN_NAME)
  }
}

export default (router: Router) => {
  new Guard(router).run()
}
