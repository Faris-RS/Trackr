// Main imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routing and app import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Main module and service import
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ErrorHandlingService } from './core/interceptors/error-handling/error-handling.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    UserModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
