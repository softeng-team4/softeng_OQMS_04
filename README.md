# softeng_OQMS_04
Project technology: JavaScript

## API

### Officer API

- PUT `/api/officer/ticket`
  - Request parameters: none
  - Request body:
    - counter: id of the officer-associated counter
    - served: id of the just served ticket
  - Response body (when success): 
    - next: id of the ticket to be served
  - Error codes: 401 Unauthorized, 503 Service Unavailable ('SQLite error')

  ```
  Request url: /api/officer/ticket

  Response body (when success):
  {"next": 123}
  ```

