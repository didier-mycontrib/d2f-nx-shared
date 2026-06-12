import { Route } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';
import { ProductComponent } from './product/product.component';
import { DeviseComponent } from './devise/devise.component';
import { LoginOutComponent } from './login-out/login-out.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authGuard } from 'd2f-ngx-session';

export const appRoutes: Route[] = [
    { path: 'ngr-home', component: HomeComponent },
    { path: 'ngr-login-out', component: LoginOutComponent },
    { path: 'ngr-not-authorized', component: NotAuthorizedComponent },
    { path: 'ngr-basic', component: BasicComponent },
    { path: 'ngr-person', component: PersonComponent },
    { path: 'ngr-product', component: ProductComponent },
    { path: 'ngr-devise', component: DeviseComponent, canActivate : [ authGuard ]},
    { path: '', redirectTo: '/ngr-home', pathMatch: 'full'},
    { path: '**', redirectTo: '/ngr-home', pathMatch: 'full'}
];
