export class PaginatedResponseDto<T> {
  data: T[];
  meta: {
    firstPage: number;
    total: number;
    lastPage: number;
    currentPage: number;
    itemsPerPage: number;
  };
}
