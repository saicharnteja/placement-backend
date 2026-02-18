from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# ✅ HOME PAGE ROUTE
@app.route('/')
def home():
    return render_template('index.html')


# ✅ ADD STUDENT API
@app.route('/addstudent', methods=['POST'])
def addstudent():
    try:
        db = mysql.connector.connect(
            host="localhost",
            user="root",
            password="root",
            database="placementdb",
            port=8889
        )

        cursor = db.cursor()

        data = request.json

        name = data['name']
        cgpa = float(data['cgpa'])
        skills = float(data['skills'])
        aptitude = float(data['aptitude'])
        comm = float(data['comm'])

        score = (cgpa*10 + skills + aptitude + comm) / 4

        if score > 70:
            prediction = "High"
        elif score > 50:
            prediction = "Medium"
        else:
            prediction = "Low"

        cursor.execute(
            "INSERT INTO students(name,cgpa,skills,aptitude,communication,prediction) VALUES (%s,%s,%s,%s,%s,%s)",
            (name, cgpa, skills, aptitude, comm, prediction)
        )

        db.commit()
        cursor.close()
        db.close()

        return jsonify({"prediction": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})


# ✅ RUN APP (MUST BE LAST LINE)
if __name__ == '__main__':
    app.run(debug=True)