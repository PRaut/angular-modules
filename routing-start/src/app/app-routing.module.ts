import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { AuthGuardServiceGuard } from "./auth-guard-service.guard";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolverService } from "./servers/server/server-resolver.service";


const appRoutes: Routes = [
    // { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: '', component: HomeComponent},
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers',
        // canActivate: [AuthGuardServiceGuard] ,
        canActivateChild: [AuthGuardServiceGuard],
        component: ServersComponent, children: [
            { path: ':id', component: ServerComponent, resolve: {server: ServerResolverService} },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    // { path: 'page-not-found', component: PageNotFoundComponent },
    {path: 'page-not-found', component: ErrorPageComponent, data: {message: 'Page not found'}},
    { path: '**', redirectTo: '/page-not-found' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }