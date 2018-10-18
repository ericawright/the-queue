CREATE FUNCTION update_modified_column() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN
    NEW.updated_at := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$;
