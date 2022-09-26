import { TCampus } from "./Campus";

export type TCourseSelect = {
  nome: string;
  id: string;
}

export type TCourse = {
  codigo_siaa: string;
  codigo_mec: string;
  nome: string;
  unidades: string[];
}

export type TCourseCreate = {
  codigo_siaa: string;
  codigo_mec: string;
  nome: string;
  unidades: string[];
}