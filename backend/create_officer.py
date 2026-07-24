from werkzeug.security import generate_password_hash
from database.database import init_db, create_user

# Create tables if they don't exist
init_db()

name = "Amit Kumar"
email = "amit@bbsr.gov.in"
password = "Officer@123"

hashed_password = generate_password_hash(password)

create_user(
    name,
    email,
    hashed_password,
    role="officer"
)

print("Officer created successfully!")