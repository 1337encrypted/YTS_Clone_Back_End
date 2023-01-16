# User Route API Docs (`/user`)

<a name="login"></a>

## `/user/login`

Use this API to login to a User's account.

**Method**: `POST`

**Body Parameters**:

```json
{
    "email": "string",
    "password": "string"
}
```

| Fields | Type | Required | Notes |
|--------|------|----------|-------|
| email | String | Yes | A valid and registered email address |
| password | String | Yes | Password in the range 6-16 characters |

### **Success Response** (`application/json`)

```json
{
    "access_token": "string"
}
```

**NOTE**: The received `access_token` must be cached securely on the client-side.

### [**Error codes**](/src/configs/error.codes.config.json)

- `ERR_NOE`
- `ERR_INVE`
- `ERR_NOP`
- `ERR_INVP`
- `ERR_UNF`
- `ERR_PMM`
- `ERR_INTE`

---

<a name="register"></a>

## `/user/register`

Use this API to register a new account.

**Method**: `POST`

**Body Parameters**:

```json
{
    "email": "string",
    "password": "string",
    "name": "string"
}
```

| Fields | Type | Required | Notes |
|--------|------|----------|-------|
| email | String | Yes | A valid and un-registered email address |
| password | String | Yes | Password in the range 6-16 characters |
| name | String | No (`null`) | Name of the user |

### **Success Response** (`application/json`)

```json
{
    "profile": {
        "_id": "string",
        "username": "string",
        "name": "string|null",
        "email": "string",
        "__v": "integer"
    }
}
```

### [**Error codes**](/src/configs/error.codes.config.json)

- `ERR_NOE`
- `ERR_INVE`
- `ERR_NOP`
- `ERR_INVP`
- `ERR_INVN`
- `ERR_EUSE`
- `ERR_INTE`

---

<a name="auth"></a>

## `/user/auth`

Use this API to refresh a User's access token.

**Method**: `GET`

**Headers**:

```json
{
    "Authorization": "Bearer ..."
}
```

| Fields | Type | Required | Notes |
|--------|------|----------|-------|
| Authorization | String | Yes | A valid and unexpired access token |

### **Success Response** (`application/json`)

```json
{
    "profile": {
        "_id": "string",
        "username": "string",
        "name": "string",
        "email": "string",
        "__v": "integer"
    },
    "sessionTimeoutAfter": "long"
}
```

### [**Error codes**](/src/configs/error.codes.config.json)

- `ERR_UNC`
- `ERR_INVAT`
- `ERR_UNF`
- `ERR_EXPAT`
- `ERR_INTE`
