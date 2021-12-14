import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { UserForModify } from "src/app/model/user";
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ModifyService } from "src/app/services/modify.service";

@Injectable({
  providedIn: 'root'
})

export class ModifyProfileResolverService implements Resolve<UserForModify>{

  constructor(private router:Router,
              private modifyService:ModifyService)
              {}

  resolve(route:ActivatedRouteSnapshot,state : RouterStateSnapshot) :Observable<UserForModify>|UserForModify | any{
      const propUsername=route.params['username'];
      return this.modifyService.getUser(String(propUsername)).pipe(
        catchError(error=>{
          this.router.navigate(['/'])
          return of(null);
        })
      )


  }
}
