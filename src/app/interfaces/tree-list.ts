export interface Parent {
  id: string;
  name: string;
  children: Child[];
  level: number;
  active: boolean;
}
interface Child {
  id: string;
  name: string;
  children: Child[];
  level: number;
  active: boolean;
}
