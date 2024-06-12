export enum FILTERBY {
  LAST_UPDATE = "last_update",
  CREATED_DATE = "created_date",
  TITLE = "title",
}

export function getTitle(filter: FILTERBY) {
  switch (filter) {
    case FILTERBY.LAST_UPDATE:
      return "Last Updated";
    case FILTERBY.CREATED_DATE:
      return "Created Date";
    case FILTERBY.TITLE:
      return "Title";
  }
}
