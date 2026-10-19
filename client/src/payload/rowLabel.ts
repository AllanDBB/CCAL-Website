/** Las filas de una lista muestran el valor de este campo en lugar de «Elemento 01». */
export const rowLabel = (field: string) => ({
  components: { RowLabel: { path: "/payload/components/RowLabel", clientProps: { field } } },
});
