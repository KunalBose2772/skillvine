import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontFamily, FontSize } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { GradientButton } from '../components/ui/GradientButton';
import { AppText } from '../components/ui/AppText';
import { AuthStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  const { login, isLoading } = useAuthStore();
  const { isDark, colors } = useThemeStore();

  const handleLogin = async () => {
    if (!email || !password) return;
    await login(email, password);
  };

  const renderInput = (
    field: 'email' | 'password',
    placeholder: string,
    value: string,
    onChangeText: (t: string) => void,
    icon: string,
    extra?: object
  ) => (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, delay: field === 'email' ? 300 : 400 }}
      style={[
        styles.inputWrapper,
        { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
        focused === field && { borderColor: colors.primaryBlue },
      ]}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={focused === field ? colors.primaryBlue : colors.textMuted}
        style={styles.inputIcon}
      />
      <TextInput
        style={[styles.input, { color: colors.textPrimary }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
        autoCapitalize="none"
        {...extra}
      />
      {field === 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      )}
    </MotiView>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Glow */}
        <LinearGradient
          colors={['rgba(0,102,255,0.25)', 'transparent']}
          style={styles.topGlow}
        />

        {/* Logo */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 200, delay: 100 }}
          style={styles.logoRow}
        >
          <Image
            source={
              isDark
                ? require('../../assets/logo-dark.png')
                : require('../../assets/logo-light.png')
            }
            style={styles.logoImage}
          />
        </MotiView>

        {/* Heading */}
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 200 }}
          style={styles.headingBlock}
        >
          <AppText variant="h2" style={styles.heading}>
            Welcome back
          </AppText>
          <AppText variant="subtitle" style={{ color: colors.textSecondary }}>
            Continue your learning journey
          </AppText>
        </MotiView>

        {/* Social login */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 250 }}
          style={styles.socialRow}
        >
          {['logo-google', 'logo-apple'].map((icon, i) => (
            <TouchableOpacity
              key={icon}
              style={[
                styles.socialBtn,
                { backgroundColor: colors.surfaceElevated, borderColor: colors.surfaceBorder },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name={icon as any} size={22} color={colors.textPrimary} />
              <AppText variant="bodySmall" style={{ color: colors.textPrimary, fontFamily: FontFamily.bodySemiBold }}>
                {i === 0 ? 'Google' : 'Apple'}
              </AppText>
            </TouchableOpacity>
          ))}
        </MotiView>

        {/* Divider */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 280 }}
          style={styles.dividerRow}
        >
          <View style={[styles.dividerLine, { backgroundColor: colors.surfaceBorder }]} />
          <AppText variant="caption" style={{ color: colors.textMuted }}>
            or continue with email
          </AppText>
          <View style={[styles.dividerLine, { backgroundColor: colors.surfaceBorder }]} />
        </MotiView>

        {/* Inputs */}
        {renderInput('email', 'Email address', email, setEmail, 'mail-outline', {
          keyboardType: 'email-address',
        })}
        {renderInput('password', 'Password', password, setPassword, 'lock-closed-outline', {
          secureTextEntry: !showPassword,
        })}

        {/* Forgot */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 450 }}
          style={styles.forgotRow}
        >
          <TouchableOpacity>
            <AppText variant="bodySmall" color={colors.primaryBlue}>
              Forgot password?
            </AppText>
          </TouchableOpacity>
        </MotiView>

        {/* Sign in */}
        <MotiView
          from={{ opacity: 0, translateY: 12 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 480 }}
        >
          <GradientButton
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            disabled={!email || !password}
          />
        </MotiView>

        {/* Sign up link */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 550 }}
          style={styles.signupRow}
        >
          <AppText variant="bodySmall" color={colors.textSecondary}>
            Don't have an account?{' '}
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <AppText variant="bodySmall" color={colors.primaryBlue} style={styles.link}>
              Sign up free
            </AppText>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
    paddingBottom: 40,
  },
  topGlow: {
    position: 'absolute',
    top: -100,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoImage: {
    width: 160,
    height: 48,
    resizeMode: 'contain',
  },
  headingBlock: {
    marginBottom: Spacing['2xl'],
  },
  heading: {
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    height: 52,
    borderRadius: Radius.button,
    borderWidth: 1,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.input,
    borderWidth: 1,
    paddingHorizontal: Spacing.base,
    height: 56,
    marginBottom: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.base,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: Spacing.xl,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  link: {
    fontFamily: FontFamily.bodySemiBold,
  },
});
