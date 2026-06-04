import { Route } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { HomeComponent } from './home/home.component';
import { PersonComponent } from './person/person.component';

export const appRoutes: Route[] = [
    { path: 'ngr-home', component: HomeComponent },
    { path: 'ngr-basic', component: BasicComponent },
    { path: 'ngr-person', component: PersonComponent },
    { path: '', redirectTo: '/ngr-home', pathMatch: 'full'},
    { path: '**', redirectTo: '/ngr-home', pathMatch: 'full'}
];
