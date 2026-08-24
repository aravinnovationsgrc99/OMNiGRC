# Evidence Storage Architecture

## Storage Bucket
- Private Bucket: `omni-evidence`
- Object Path Format: `{organization_id}/{entity_type}/{entity_id}/{timestamp}-{filename}`
- Download Access: Authenticated Signed URLs (`createSignedUrl`) with 3600s expiration. Public access is strictly forbidden.
