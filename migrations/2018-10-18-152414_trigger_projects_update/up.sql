CREATE TRIGGER updated_at_on_projects 
BEFORE UPDATE ON projects 
FOR EACH ROW 
EXECUTE PROCEDURE update_modified_column();