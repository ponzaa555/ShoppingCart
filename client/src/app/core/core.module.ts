import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { SectionHeaderComponent } from './section-header/section-header.component';
import {BreadcrumbComponent, BreadcrumbItemDirective} from 'xng-breadcrumb'
import { SharedModule } from '../shared/share.module';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [NavBarComponent , TestErrorComponent ,NotFoundComponent , ServerErrorComponent, SectionHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BreadcrumbComponent, 
    BreadcrumbItemDirective,
    SharedModule
  ],

  // export for call NavBar in AppModule 
  exports:[NavBarComponent , SectionHeaderComponent],
})
export class CoreModule { }
