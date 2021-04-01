import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

GoogleSignin.configure({
    webClientId: '329512022623-vpn4d3qqnv3thc70cmpsfbrns7fu2hat.apps.googleusercontent.com',
});

const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
}

const TestScreen = props => {

    AccessToken.getCurrentAccessToken().then(
        (data) => {
            console.log(data)
            console.log(data.accessToken)
            console.log(data.userID);
        });

    const fbSignIn = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                    console.log(result)
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }


    return (
        <View style={styles.screen}>
            <Button
                title='Google Sign-in'
                onPress={() =>
                    onGoogleButtonPress()
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                }
            />
            <Button
                title='FB Sign-in'
                onPress={fbSignIn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TestScreen;