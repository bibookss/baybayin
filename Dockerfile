# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy your FastAPI application code and related files
COPY src/ /app/
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Expose the port the FastAPI app will run on
EXPOSE 8000

# Command to start the FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]