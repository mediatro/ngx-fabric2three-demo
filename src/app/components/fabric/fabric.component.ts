import { Component, OnInit } from '@angular/core';
import {fabric} from "fabric";
import {FabricToThreeBridgeService} from "../../services/fabric-to-three-bridge.service";

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.css']
})
export class FabricComponent implements OnInit {

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

    this.f2t.addToCanvas(circle, 'circle');
    this.f2t.addToCanvas(triangle, 'triangle');

    let circle2 = new fabric.Circle({
      radius: 20, fill: 'red', left: 100, top: 100
    });

    this.canvas.add(circle2);

    this.canvas.remove(this.f2t.registeredElements['circle']);
  }

}
