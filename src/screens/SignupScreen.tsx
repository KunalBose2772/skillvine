import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme/colors';
import { FontFamily, FontSize } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { GradientButton } from '../components/ui/GradientButton';
import { AppText } from '../components/ui/AppText';
import { AuthStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

export const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'name' | 'email' | 'password' | null>(null);
  const { signup, isLoading } = useAuthStore();

  const handleSignup = async () => {
    if (!name || !email || !password) return;
    await signup(name, email, password);
  };

  const renderInput = (
    field: 'name' | 'email' | 'password',
    placeholder: string,
    value: string,
    onChangeText: (t: string) => void,
    icon: string,
    extra?: object
  ) => (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, delay: field === 'name' ? 300 : field === 'email' ? 380 : 460 }}
      style={[styles.inputWrapper, focused === field && styles.inputFocused]}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={focused === field ? Colors.primaryBlue : Colors.textMuted}
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
        autoCapitalize={field === 'name' ? 'words' : 'none'}
        {...extra}
      />
      {field === 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      )}
    </MotiView>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['rgba(0,184,255,0.2)', 'transparent']} style={styles.topGlow} />

        {/* Back button */}
        <MotiView from={{ opacity: 0, translateX: -10 }} animate={{ opacity: 1, translateX: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 100 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </MotiView>

        <MotiView from={{ opacity: 0, translateY: 16 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 180 }} style={styles.headingBlock}>
          <AppText variant="h2" style={styles.heading}>Create account</AppText>
          <AppText variant="subtitle">Join 50,000+ learners growing daily</AppText>
        </MotiView>

        {renderInput('name', 'Full name', name, setName, 'person-outline')}
        {renderInput('email', 'Email address', email, setEmail, 'mail-outline', { keyboardType: 'email-address' })}
        {renderInput('password', 'Password', password, setPassword, 'lock-closed-outline', { secureTextEntry: !showPassword })}

        <MotiView from={{ opacity: 0, translateY: 12 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 500 }} style={styles.ctaContainer}>
          <GradientButton title="Create Account" onPress={handleSignup} loading={isLoading} disabled={!name || !email || !password} />
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 400, delay: 560 }} style={styles.termsRow}>
          <AppText variant="caption" align="center" color={Colors.textMuted}>
            By signing up you agree to our{' '}
            <AppText variant="caption" color={Colors.primaryBlue}>Terms of Service</AppText>
            {' '}and{' '}
            <AppText variant="caption" color={Colors.primaryBlue}>Privacy Policy</AppText>
          </AppText>
        </MotiView>

        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 400, delay: 600 }} style={styles.loginRow}>
          <AppText variant="bodySmall" color={Colors.textSecondary}>Already have an account? </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText variant="bodySmall" color={Colors.primaryBlue} style={{ fontFamily: FontFamily.bodySemiBold }}>Sign in</AppText>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: 40 },
  topGlow: { position: 'absolute', top: -80, right: -60, width: 280, height: 280, borderRadius: 140 },
  backBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: Colors.surfaceElevated, borderWidth: 1, borderColor: Colors.surfaceBorder, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing['2xl'] },
  headingBlock: { marginBottom: Spacing['2xl'] },
  heading: { marginBottom: Spacing.xs, letterSpacing: -0.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surfaceElevated, borderRadius: Radius.input, borderWidth: 1, borderColor: Colors.surfaceBorder, paddingHorizontal: Spacing.base, height: 56, marginBottom: Spacing.md },
  inputFocused: { borderColor: Colors.primaryBlue },
  inputIcon: { marginRight: Spacing.sm },
  input: { flex: 1, fontFamily: FontFamily.bodyRegular, fontSize: FontSize.base, color: Colors.textPrimary },
  ctaContainer: { marginTop: Spacing.lg, marginBottom: Spacing.xl },
  termsRow: { marginBottom: Spacing.xl, paddingHorizontal: Spacing.md },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
