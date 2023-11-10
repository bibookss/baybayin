# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Install libraries
RUN apt-get update && apt-get install libsm6 libxext6  -y

# Copy your FastAPI application code and related files
COPY src/ /app/
COPY requirements.txt .

# Install dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port the FastAPI app will run on
EXPOSE 3000

# Command to start the FastAPI app
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3000"]