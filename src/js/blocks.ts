export abstract class Block {
  id: string;
  color: number;

  constructor(id: string, color: number) {
    this.id = id;
    this.color = color;
  }

  abstract onUpdate(): Block[];
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
  constructor() {
    super("power", 0x00aa00)
  }

  onUpdate(): Block[] {
    return [];
  }
}

export class ConductorBlock extends Block {
  constructor() {
    super("conductor", 0xffaa00)
  }

  onUpdate(): Block[] {
    return []
  }
}

export default {
  power: PowerBlock,
  conductor: ConductorBlock
}
