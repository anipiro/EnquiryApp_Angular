# EnquiryApp

A customer enquiry tracker with an ASP.NET Core Web API and an Angular front end, both kept in this one repository.

## What it does

- **New enquiry form.** The `/createNew` page takes an enquiry type, a status, the customer's name, mobile number and email, a message and optional resolution notes, and posts them to the API. The type and status dropdowns are filled from the API.
- **Enquiry list.** The `/list` page shows every enquiry in a table with its id, customer, email, mobile number, status id and resolution.
- **Edit in place.** Edit on a row turns its status id and resolution into inputs; Save sends them to the API and reloads the list.
- **Delete.** Delete on a row removes the enquiry and reloads the list.
- **Swagger UI.** In the Development environment the API serves Swagger UI at `/swagger`.


## How it is built

| Part | Technology |
|------|------------|
| API | ASP.NET Core Web API on .NET 8 |
| Data access | Entity Framework Core 8.0.0 (`Microsoft.EntityFrameworkCore.SqlServer`) |
| Database | SQL Server |
| API docs | Swashbuckle.AspNetCore 6.6.2 |
| Front end | Angular 21.1 (standalone components, template-driven forms), TypeScript 5.9, RxJS 7.8 |
| Styling | Bootstrap 5.3.8 |

The API project (`Enquiry.API.csproj`) and the Angular workspace (`package.json`, `angular.json`) share the repository root. On the server, `Controllers/EnquiryMasterController.cs` holds every action and queries `Model/EnquiryDbContext.cs` directly; the entities are `EnquiryModel` (table `Enquiry`), `EnquiryStatus` and `EnquiryType`. `Program.cs` sets camelCase JSON and a CORS policy that accepts any `localhost` origin. On the client, `src/service/master.ts` wraps all HTTP calls, `src/app/models/enquiry.model.ts` has the matching TypeScript interfaces, and the two pages are `src/app/Pages/enquiry-list` and `src/app/Pages/new-enquiry`.

## API

| Method | Path | What it does |
|--------|------|--------------|
| GET | `/api/enquiries` | Returns all enquiries. |
| GET | `/api/enquiries/statuses` | Returns the list of statuses. |
| GET | `/api/enquiries/types` | Returns the list of enquiry types. |
| POST | `/api/enquiries` | Creates an enquiry and returns it (201). |
| PUT | `/api/enquiries/{id}` | Updates the status and resolution of an enquiry; other fields in the body are ignored. 404 if the id does not exist. |
| DELETE | `/api/enquiries/{id}` | Deletes an enquiry (204). 404 if the id does not exist. |

## Run it locally

You need the .NET 8 SDK (or later), a SQL Server instance, and Node.js 20.19 or later with npm.

1. Clone the repository.

   ```bash
   git clone https://github.com/anipiro/EnquiryApp_Angular.git
   cd EnquiryApp_Angular
   ```

2. Set the connection string, `ConnectionStrings:EnquiryCon`. `appsettings.json` has a `YOUR_SERVER` placeholder, but `appsettings.Development.json` overrides it in development and points at the author's own machine, so change it there:

   ```json
   "ConnectionStrings": {
     "EnquiryCon": "Server=YOUR_SERVER;Database=EnquiryDb;Trusted_Connection=True;TrustServerCertificate=True"
   }
   ```

3. Create the database. The repository has no EF Core migrations, so generate one first:

   ```bash
   dotnet tool install --global dotnet-ef
   dotnet ef migrations add Initial
   dotnet ef database update
   ```

   Then add a few rows to the `EnquiryStatus` and `EnquiryType` tables by hand. Nothing seeds them and the API has no endpoint to create them, and the form needs them for its dropdowns.

4. Start the API with the HTTPS profile. The Angular service calls `https://localhost:7116` (hard-coded in `src/service/master.ts`), and the default profile only serves HTTP.

   ```bash
   dotnet dev-certs https --trust
   dotnet run --launch-profile https
   ```

5. In a second terminal, start the front end.

   ```bash
   npm install
   npm start
   ```

The app is at `http://localhost:4200` and Swagger UI at `https://localhost:7116/swagger`.

Released under the MIT License; see `LICENSE`.
