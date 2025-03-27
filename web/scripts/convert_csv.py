import csv
import json
import os
import xml.dom.minidom as md
from pathlib import Path

def csv_to_json(csv_file_path, json_file_path):
    """Convert CSV file to JSON file."""
    data = []
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
    
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

def csv_to_xml(csv_file_path, xml_file_path):
    """Convert CSV file to XML file."""
    with open(csv_file_path, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)
        
        # Create XML document
        doc = md.getDOMImplementation().createDocument(None, "data", None)
        root = doc.documentElement
        
        # Add each row to XML
        for row in csv_reader:
            record = doc.createElement("record")
            for i, header in enumerate(headers):
                if i < len(row):  # Ensure index is within range
                    field = doc.createElement(header.replace(' ', '_'))
                    text = doc.createTextNode(row[i])
                    field.appendChild(text)
                    record.appendChild(field)
            root.appendChild(record)
        
        # Write XML to file
        with open(xml_file_path, 'w', encoding='utf-8') as xml_file:
            xml_file.write(doc.toprettyxml(indent="  "))

def main():
    # Path to the cleaned directory
    cleaned_dir = Path("web/public/cleaned")
    
    # Create directories for JSON and XML files if they don't exist
    json_dir = cleaned_dir.parent / "json"
    xml_dir = cleaned_dir.parent / "xml"
    
    os.makedirs(json_dir, exist_ok=True)
    os.makedirs(xml_dir, exist_ok=True)
    
    # Process each CSV file
    for csv_file in cleaned_dir.glob("*.csv"):
        file_name = csv_file.stem
        
        # Convert to JSON
        json_file_path = json_dir / f"{file_name}.json"
        print(f"Converting {csv_file} to {json_file_path}")
        csv_to_json(csv_file, json_file_path)
        
        # Convert to XML
        xml_file_path = xml_dir / f"{file_name}.xml"
        print(f"Converting {csv_file} to {xml_file_path}")
        csv_to_xml(csv_file, xml_file_path)
        
    print("Conversion completed successfully!")

if __name__ == "__main__":
    main() 