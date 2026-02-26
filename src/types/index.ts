export interface PhotoMetadata {
  timestamp: string;
  location: string;
}

export interface VerificationData {
  id: string;
  instruction_id: string;
  name: string;
  address: string;
  type_of_address: string;
  mobile_number: string;
  period_of_stay: string;
  ref_id: string;
  verification_date: string;
  ownership_status: string;
  comment: string;
  verification_status: 'pass' | 'fail' | 'pending';

  // Evidence (Base64)
  selfie?: string;
  location_picture?: string;
  id_proof_relative?: string;
  id_proof_candidate?: string;
  id_proof_candidate_back?: string;
  landmark_picture?: string;

  // Individual Photo Metadata
  selfie_meta?: PhotoMetadata;
  location_picture_meta?: PhotoMetadata;
  id_proof_relative_meta?: PhotoMetadata;
  id_proof_candidate_meta?: PhotoMetadata;
  id_proof_candidate_back_meta?: PhotoMetadata;
  landmark_picture_meta?: PhotoMetadata;

  // Metadata
  captured_lat?: number;
  captured_lng?: number;
  captured_timestamp?: string;

  claimed_lat?: number;
  claimed_lng?: number;

  created_at?: string;
}

export type Step = 'personal' | 'photos' | 'location' | 'submitting' | 'success';
