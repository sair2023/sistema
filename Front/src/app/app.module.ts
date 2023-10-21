import { NgModule } from "@angular/core";
import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { PageLoaderComponent } from "./layout/page-loader/page-loader.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { AuthLayoutComponent } from "./layout/app-layout/auth-layout/auth-layout.component";
import { MainLayoutComponent } from "./layout/app-layout/main-layout/main-layout.component";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {
  HttpClientModule,
  HttpClient,
} from "@angular/common/http";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { NgScrollbarModule } from "ngx-scrollbar";
import { UsuarioComponent } from './usuario/usuario.component';
import { ComponentsModule } from "./shared/components/components.module";
import { EmpleadoComponent } from './empleado/empleado.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SalarioComponent } from './salario/salario.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { VentasComponent } from './ventas/ventas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductosComponent } from './tienda/productos/productos.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PageLoaderComponent,
        SidebarComponent,
        AuthLayoutComponent,
        MainLayoutComponent,
        UsuarioComponent,
        EmpleadoComponent,
        SalarioComponent,
        CuentaComponent,
        VentasComponent,
        TiendaComponent,
        ProductosComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CKEditorModule,
        AppRoutingModule,
        HttpClientModule,
        LoadingBarRouterModule,
        NgScrollbarModule,
        PdfViewerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        SharedModule,
        ComponentsModule,
        NgxDatatableModule
    ]
})
export class AppModule {}
