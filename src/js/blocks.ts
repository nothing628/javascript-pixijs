import chroma from "chroma-js";

export abstract class Block {
  id: string;
  color: number;

  constructor(id: string, color: number) {
    this.id = id;
    this.color = color;
  }

  abstract onUpdate(): Block[];
  abstract getRenderColor(): number;
}

export interface IBlockLocation {
  x: number;
  y: number;
  block: Block;
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

  onUpdate(): Block[] {
    this.is_power_on = !this.is_power_on;
    return [];
  }
}

export class ConductorBlock extends Block {
  constructor() {
    super("conductor", 0xffaa00);
  }

  getRenderColor(): number {
    return this.color;
  }

  onUpdate(): Block[] {
    return [];
  }
}

export const BlockList = {
  power: PowerBlock,
  conductor: ConductorBlock,
};

export default BlockList;
