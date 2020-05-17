import chroma from "chroma-js";

export interface IBlockNeighbour {
  TopLeft: Block | null;
  TopCenter: Block | null;
  TopRight: Block | null;
  MiddleLeft: Block | null;
  MiddleRight: Block | null;
  BottomLeft: Block | null;
  BottomCenter: Block | null;
  BottomRight: Block | null;
}

export class BlockNeighbour implements IBlockNeighbour {
  TopLeft: Block | null;
  TopCenter: Block | null;
  TopRight: Block | null;
  MiddleLeft: Block | null;
  MiddleRight: Block | null;
  BottomLeft: Block | null;
  BottomCenter: Block | null;
  BottomRight: Block | null;

  constructor(...params: Block[]) {
    for (let i = 0; i < params.length; i++) {
      switch (i) {
        case 0:
          this.TopLeft = params[i];
          break;
        case 1:
          this.TopCenter = params[i];
          break;
        case 2:
          this.TopRight = params[i];
          break;
        case 3:
          this.MiddleLeft = params[i];
          break;
        case 4:
          this.MiddleRight = params[i];
          break;
        case 5:
          this.BottomLeft = params[i];
          break;
        case 6:
          this.BottomCenter = params[i];
          break;
        case 7:
          this.BottomRight = params[i];
          break;
        case 8:
          this.BottomRight = params[i];
          break;
      }
    }
  }
}

export abstract class Block {
  id: string;
  color: number;

  constructor(id: string, color: number) {
    this.id = id;
    this.color = color;
  }

  abstract onUpdate(neighbour: IBlockNeighbour): Block[];
  abstract getRenderColor(): number;
}

export interface IBlockLocation {
  x: number;
  y: number;
  block: Block;

  getRealX(grid_size?: number): number;
  getRealY(grid_size?: number): number;
}

export class BlockLocation implements IBlockLocation {
  x: number;
  y: number;
  block: Block;

  constructor(block: Block, x: number, y: number) {
    this.block = block;
    this.x = x;
    this.y = y;
  }

  getRealX(grid_size: number = 10): number {
    return this.x * grid_size;
  }

  getRealY(grid_size: number = 10): number {
    return this.y * grid_size;
  }
}

export class PowerBlock extends Block {
  is_power_on = true;

  constructor() {
    super("power", 0x00aa00);
  }

  getRenderColor(): number {
    let color = chroma(this.color);

    if (this.is_power_on) {
      color = color.brighten(2);
    }

    return color.num();
  }

  onUpdate(neighbour: IBlockNeighbour): Block[] {
    this.is_power_on = !this.is_power_on;
    return [];
  }
}

export class ConductorBlock extends Block {
  is_power_on: boolean = false;

  constructor() {
    super("conductor", 0xffaa00);
  }

  getRenderColor(): number {
    let color = chroma(this.color);

    if (this.is_power_on) {
      color = color.brighten(2);
    }

    return color.num();
  }

  onUpdate(neighbour: IBlockNeighbour): Block[] {
    return [];
  }
}

export const BlockList = {
  power: PowerBlock,
  conductor: ConductorBlock,
};

export default BlockList;
