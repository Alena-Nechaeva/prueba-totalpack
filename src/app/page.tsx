import { Container } from '@mui/system';
import UsersTable from "@/components/UsersTable/UsersTable";

export default function HomePage() {
  return (
      <Container maxWidth='xl'>
        <UsersTable/>
      </Container>
  );
}
