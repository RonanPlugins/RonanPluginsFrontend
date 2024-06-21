export enum SORTBY {
  LAST_UPDATE = "last_update",
  CREATED_DATE = "created_date",
  TITLE = "title",
}

export function getTitle(filter: SORTBY) {
  switch (filter) {
    case SORTBY.LAST_UPDATE:
      return "Recently Updated";
    case SORTBY.CREATED_DATE:
      return "Recently Published";
    case SORTBY.TITLE:
      return "Alphabetical";
  }
}
