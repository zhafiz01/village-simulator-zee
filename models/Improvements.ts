export interface Resource {
    type: string;
    amount: number;
}

export interface Improvement {
    type: string;
    level: number;  //level of the improvement
    icon: string;
    const: Resource[];
    resourceProduced?: Resource
}