import { Component, OnInit } from '@angular/core';
import {fabric} from "fabric";
import {FabricToThreeBridgeService, PatchedFabricObject} from "../../services/fabric-to-three-bridge.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.css']
})
export class FabricComponent implements OnInit {

  importJsonControl = new FormControl();

  private _canvas?: fabric.Canvas;
  get canvas(): fabric.Canvas | undefined {
    return this._canvas;
  }
  set canvas(value: fabric.Canvas | undefined) {
    this._canvas = value;
    this.f2t.canvas = value;
  }

  constructor(
    private f2t: FabricToThreeBridgeService,
  ) { }

  ngOnInit(): void {

    this.f2t.canvasChanged$.subscribe(els => {
      console.log('Elements changed', els);
    });

    this.canvas = new fabric.Canvas('fabricSurface', {
      backgroundColor: '#ebebff',
      preserveObjectStacking: true,
    });

    let circle = new fabric.Circle({
      radius: 20, fill: 'green', left: 100, top: 100
    });

    let triangle = new fabric.Triangle({
      width: 20, height: 30, fill: 'blue', left: 50, top: 50
    });

    let circle2 = new fabric.Circle({
      radius: 20, fill: 'red', left: 100, top: 100
    });

    this.f2t.setObjectName(circle, 'green');
    this.f2t.setObjectName(triangle, 'blue');

    this.canvas.add(circle, triangle, circle2);

    let c = this.f2t.getObjectById((circle as any).id);

    if(c){
      this.canvas.remove(c);
    }
  }

  importJson() {
   this.f2t.importCanvasFromJson(this.importJsonControl.value);
  }

  exportJson() {
    console.log(this.f2t.exportCanvasToJson());
  }
}
