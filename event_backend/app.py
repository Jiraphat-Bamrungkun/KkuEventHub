from flask import Flask, request, jsonify
from db import get_db_connection

app = Flask(__name__)

@app.route('/api/add_event', methods=['POST'])
def add_event():
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    sql = """INSERT INTO events (timestamp, email, title, description, start_date, start_time, end_date, end_time, location, latitude, longitude, event_type, organizer, participants, dress_code, registration_link, poster_url, background_url)
             VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

    values = (data["timestamp"], data["email"], data["title"], data["description"], data["start_date"], data["start_time"], data["end_date"], data["end_time"], data["location"], data["latitude"], data["longitude"], data["event_type"], data["organizer"], data["participants"], data["dress_code"], data["registration_link"], data["poster_url"], data["background_url"])

    cursor.execute(sql, values)
    conn.commit()

    cursor.close()
    conn.close()
    return jsonify({"message": "Event added successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
