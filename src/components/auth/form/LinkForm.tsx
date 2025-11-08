import {
    Box,
    Typography,
    Link,

} from '@mui/material';
interface LinkFormProps {
    link: string;
    textlink: string;
    textquestion: string;
}
export const LinkForm = ({ link, textlink, textquestion }: LinkFormProps) => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                mt: 2,
                pt: 2,
                borderTop: '1px solid #e0e0e0',
            }}
        >
            <Typography variant="body2">
                {textquestion}
                <Link
                    href={link}
                    sx={{
                        cursor: 'pointer',
                        color: '#1976d2',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {textlink}
                </Link>
            </Typography>
        </Box>
    )
}
