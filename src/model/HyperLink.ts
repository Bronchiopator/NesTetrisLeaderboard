export interface HyperLink {
  formattedValue: string;
  hyperlink: string;
}
export interface HyperLinkContainer {
  values: HyperLink[];
}

export interface GoogleFieldsResult {
  sheets: [
    {
      data: [
        {
          rowData: HyperLinkContainer[];
        }
      ];
    }
  ];
}
