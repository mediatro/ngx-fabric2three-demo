import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FabricComponent } from './components/fabric/fabric.component';
import { ThreeComponent } from './components/three/three.component';
import {NgtCoreModule} from "@angular-three/core";
import {NgtMeshModule} from "@angular-three/core/meshes";
import {NgtBoxGeometryModule} from "@angular-three/core/geometries";
import {NgtMeshBasicMaterialModule} from "@angular-three/core/materials";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NgtCanvasTextureModule} from "@angular-three/core/textures";
import {FabricToThreeBridgeService} from "./services/fabric-to-three-bridge.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FabricComponent,
    ThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgtCoreModule,
    NgtMeshModule,
    NgtBoxGeometryModule,
    NgtMeshBasicMaterialModule,
    NgtCanvasTextureModule,
  ],
  providers: [
    FabricToThreeBridgeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
