import { Resource } from "./Resource"

export interface Improvement {
    type: string
    level: number
    icon: string
    cost: Resource[];
    resourceProduced?: Resource[]
}