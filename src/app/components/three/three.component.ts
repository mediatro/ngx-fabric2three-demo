import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgtVector3} from "@angular-three/core";
import {FabricToThreeBridgeService} from "../../services/fabric-to-three-bridge.service";
import {fabric} from "fabric";
import {NgtMesh} from "@angular-three/core/meshes";
import {NgtCanvasTexture} from "@angular-three/core/textures";
import * as THREE from 'three';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.css']
})
export class ThreeComponent implements OnInit {

  @ViewChild(NgtMesh, { static: true }) mesh?: NgtMesh;

  @Input() position?: NgtVector3 = [0,0,0];
  @Input() model?: NgtVector3;

  fabricCanvas?: fabric.Canvas;
  texture?: THREE.CanvasTexture;

  hover = false;
  active = false;

  constructor(
    private f2t: FabricToThreeBridgeService,
  ) { }

  ngOnInit(): void {
    this.f2t.canvasSet$.subscribe(canvas => {
      this.fabricCanvas = canvas;
      this.initTexture();
    });
  }

  initTexture(){
    if(!this.texture && this.fabricCanvas){
      this.texture = new THREE.CanvasTexture(this.fabricCanvas.getElement());
    }
  }

  onAnimate(mesh: THREE.Mesh) {
    mesh.rotation.x = mesh.rotation.y += 0.01;
  }

  onClick() {
    if(this.texture){
      this.texture.needsUpdate = true;
    }
    console.log(this.f2t.registeredElements);
  }
}
