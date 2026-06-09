# EnquiryApp

EnquiryApp is a full-stack hybrid application built with **ASP.NET Core 8 Web API** and **Angular**. The project is structured around clean RESTful design, asynchronous data access, and a frontend service layer aligned to resource-oriented API endpoints.

## Highlights

- .NET 8 Web API backend with Entity Framework Core and SQL Server
- Angular frontend with standalone components and HttpClient-based service abstraction
- Fully asynchronous controller data access (`ToListAsync`, `FirstOrDefaultAsync`, `SaveChangesAsync`)
- Resource-oriented REST endpoints under `api/enquiries`
- C# PascalCase entity properties with camelCase JSON contract output for frontend compatibility
- Unified repository hygiene for .NET + Angular (`.gitignore`, `.gitattributes`)

## Architecture Notes

### Backend

- Controller: `EnquiryMasterController`
- Base route: `/api/enquiries`
- Async action methods returning `Task<IActionResult>`
- DbContext injected via primary constructor syntax
- JSON serialization configured to camelCase in `Program.cs`

### Frontend

- Service: `src/service/master.ts`
- Service methods aligned with REST API:
  - `getEnquiries()` → `GET /api/enquiries`
  - `getStatus()` → `GET /api/enquiries/statuses`
  - `getEnquiryTypes()` → `GET /api/enquiries/types`
  - `createEnquiry()` → `POST /api/enquiries`
  - `updateEnquiry()` → `PUT /api/enquiries/{id}`
  - `deleteEnquiry()` → `DELETE /api/enquiries/{id}`

## Project Layout

```text
.
├─ Controllers/
│  └─ EnquiryMasterController.cs
├─ Model/
│  ├─ EnquiryDbContext.cs
│  ├─ EnquiryModel.cs
│  ├─ EnquiryStatus.cs
│  └─ EnquiryType.cs
├─ Program.cs
├─ appsettings.json
├─ appsettings.Development.json
├─ src/
│  ├─ app/
│  │  ├─ Pages/
│  │  │  ├─ enquiry-list/
│  │  │  └─ new-enquiry/
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  └─ app.ts
│  └─ service/
│     └─ master.ts
├─ .gitignore
└─ .gitattributes
```

## API Endpoints

| Method | Route                     | Description               |
|--------|---------------------------|---------------------------|
| GET    | `/api/enquiries`          | Get all enquiries         |
| GET    | `/api/enquiries/statuses` | Get status catalog        |
| GET    | `/api/enquiries/types`    | Get enquiry type catalog  |
| POST   | `/api/enquiries`          | Create an enquiry         |
| PUT    | `/api/enquiries/{id}`     | Update enquiry status/resolution |
| DELETE | `/api/enquiries/{id}`     | Delete enquiry            |

## Configuration

Use generic root config and local dev overrides:

- `appsettings.json`: generic/non-machine-specific defaults
- `appsettings.Development.json`: local SQL Server connection string

Example:

```json
{
  "ConnectionStrings": {
    "EnquiryCon": "Server=YOUR_SERVER;Database=EnquiryDb;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

## Quick Start (CLI)

### 1) Restore backend packages

```bash
dotnet restore
```

### 2) Run backend API

```bash
dotnet run
```

Swagger:

```text
https://localhost:7116/swagger
```

### 3) Install frontend packages

```bash
npm install
```

### 4) Run Angular app

```bash
npm start
```

Frontend URL:

```text
http://localhost:4200
```

## Development Checklist

- Keep backend and frontend running simultaneously during local development
- Keep all new API actions async and `Task<IActionResult>` based
- Preserve REST resource naming conventions when adding endpoints
- Keep JSON contract camelCase for frontend compatibility
- Do not commit machine-specific secrets or local-only environment data
