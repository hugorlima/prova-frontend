export interface Parent {
  id: string;
  name: string;
  children: Child[];
  level: number;
}
interface Child {
  id: string;
  name: string;
  children: Child[];
  level: number;
}
