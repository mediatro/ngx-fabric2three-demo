import { Injectable } from '@angular/core';
import {fabric} from "fabric";
import {ReplaySubject, Subject} from "rxjs";

export type PatchedFabricObject = fabric.Object & {
  id?: string,
  name?: string,
}

@Injectable({
  providedIn: 'root'
})
export class FabricToThreeBridgeService {

  registeredElements: {[key: string]: PatchedFabricObject} = {};

  canvasChanged$: Subject<PatchedFabricObject[]> = new Subject();

  private _canvas?: fabric.Canvas;
  get canvas(): fabric.Canvas | undefined {
    return this._canvas;
  }
  set canvas(value: fabric.Canvas | undefined) {
    this._canvas = value;

    if(value){
      const cb = () => this.canvasChanged$.next(value.getObjects());

      value.on('object:added', e => {
        if(e.target){
          this.generateIdForObject(e.target);
        }
        cb();
      });
      value.on('object:removed', cb);

      this.canvasSet$.next(value);
    }
  }

  canvasSet$: Subject<fabric.Canvas> = new ReplaySubject();

  constructor() { }

  getObjectById(id: string): PatchedFabricObject | undefined {
    return this.registeredElements[id];
  }

  registerObject(obj: PatchedFabricObject){
    if(obj.id){
      this.registeredElements[obj.id] = obj;
    }
  }

  importCanvasFromJson(json: any) {
    this.canvas?.loadFromJSON(
      json,
      this.canvas.renderAll.bind(this.canvas),
      (jo: any, fo: PatchedFabricObject) => {

      }
    );
  }

  exportCanvasToJson() {
    return this.canvas?.toJSON(['id', 'name']);
  }

  setObjectName(obj: PatchedFabricObject, name: string){
    obj.name = name;
  }

  generateIdForObject(obj: PatchedFabricObject){
    if(obj.id){
      return;
    }
    let id: string;
    let i = 0;
    do{
      id = [obj.type, obj.name, i].join('-')
      i++;
    }while(this.getObjectById(id));
    obj.id = id;
    this.registerObject(obj);
  }


}
