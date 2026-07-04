import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { app } from '@/firebase/firebaseConfig';

const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL, deleteObject };
