type Message<Content = any> = {
  name: string
  content: Content
}

enum StatusCode {
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  OK = 200
}

export {
  Message,
  StatusCode
}
