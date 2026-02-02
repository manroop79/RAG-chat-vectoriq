export type DocumentPage = {
  page: number | string
  content: string
}

export type Document = {
  id: string
  title: string
  pages: DocumentPage[]
}

