import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  const [formData, setFormData] = useState({
    displayName: '', email: '', username: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setError('Registration not yet connected. Enable Lovable Cloud to add auth.');
    }, 1000);
  };

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Join BMDB</h1>
            <p className="mt-2 text-muted-foreground">Your profile becomes your public filmography</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">{error}</div>}
            
            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input id="displayName" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder="your_username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="••••••••" required />
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>{loading ? 'Creating account...' : 'Create Account'}</Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
        </motion.div>
      </div>
    </Layout>
  );
}
