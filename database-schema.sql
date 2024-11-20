-- Handover Minutes Database Schema

-- Main handover_minutes table
CREATE TABLE handover_minutes (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    recipient VARCHAR(100) NOT NULL,
    information TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Document indexes table (related to handover_minutes)
CREATE TABLE document_indexes (
    id SERIAL PRIMARY KEY,
    handover_minute_id INTEGER REFERENCES handover_minutes(id) ON DELETE CASCADE,
    index_position INTEGER CHECK (index_position BETWEEN 1 AND 4),
    index_value VARCHAR(50) NOT NULL,
    UNIQUE(handover_minute_id, index_position)
);

-- Photos table (related to handover_minutes)
CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    handover_minute_id INTEGER REFERENCES handover_minutes(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_handover_minutes_updated_at
    BEFORE UPDATE ON handover_minutes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better query performance
CREATE INDEX idx_handover_minutes_date ON handover_minutes(date);
CREATE INDEX idx_handover_minutes_account ON handover_minutes(account_number);
CREATE INDEX idx_document_indexes_handover ON document_indexes(handover_minute_id);
CREATE INDEX idx_photos_handover ON photos(handover_minute_id);
