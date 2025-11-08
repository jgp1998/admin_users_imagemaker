import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface AuthButtonProps {
    isLoading: boolean;
    btnName: string;
}
export const AuthButton = ({ isLoading, btnName }: AuthButtonProps) => {
    return (
        <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading}
            sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#1a1f3a',
                '&:hover': {
                    backgroundColor: '#2a2f4a',
                },
                fontWeight: 'bold',
                textTransform: 'uppercase',
            }}
        >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : btnName}
        </Button>
    )
}
