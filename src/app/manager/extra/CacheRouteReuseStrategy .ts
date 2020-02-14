import {DetachedRouteHandle, RouteReuseStrategy, ActivatedRouteSnapshot} from '@angular/router/';

export class CacheRouteReuseStrategy  extends RouteReuseStrategy    {

    handlers: {[key: string]: DetachedRouteHandle} = {};
    calcKey(route: ActivatedRouteSnapshot) {
        let next = route;
        let url = "";
        while(next) {
            if (next.url) {
                url = next.url.join('/');
            }
            next = next.firstChild;
        }
        console.debug('url', url);
        return url;
    }
    shouldDetach(route: import("@angular/router").ActivatedRouteSnapshot): boolean {
        return true;   
    } 
    store(route: import("@angular/router").ActivatedRouteSnapshot, handle: import("@angular/router").DetachedRouteHandle): void {
        this.handlers[this.calcKey(route)] = handle;
    //throw new Error("Method not implemented.");
    }
    shouldAttach(route: import("@angular/router").ActivatedRouteSnapshot): boolean {
        return !!route.routeConfig && !!this.handlers[this.calcKey(route)];
        //throw new Error("Method not implemented.");
    }
    retrieve(route: import("@angular/router").ActivatedRouteSnapshot): import("@angular/router").DetachedRouteHandle {
        if (!route.routeConfig) return null;
        return this.handlers[this.calcKey(route)];
        //throw new Error("Method not implemented.");
    }
    shouldReuseRoute(future: import("@angular/router").ActivatedRouteSnapshot, curr: import("@angular/router").ActivatedRouteSnapshot): boolean {
        return curr.data.shouldReuse || future.data.shouldReuse || true
    }


}