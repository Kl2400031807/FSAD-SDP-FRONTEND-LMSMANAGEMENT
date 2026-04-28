@echo off
setlocal

set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "MAVENW_JAR=.mvn\wrapper\maven-wrapper.jar"

if not exist "%MAVENW_JAR%" (
    echo Downloading Maven wrapper...
    mkdir ".mvn\wrapper" 2>nul
    powershell -Command "Invoke-WebRequest -Uri 'https://repo1.maven.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar' -OutFile '%MAVENW_JAR%'"
)

"%JAVA_HOME%\bin\java.exe" -classpath "%MAVENW_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements.  See the NOTICE file
@REM distributed with this work for additional information
@REM regarding copyright ownership.  The ASF licenses this file
@REM to you under the Apache License, Version 2.0 (the
@REM "License"); you may not use this file except in compliance
@REM with the License.  You may obtain a copy of the License at
@REM
@REM    https://www.apache.org/licenses/LICENSE-2.0
@REM
@REM Unless required by applicable law or agreed to in writing,
@REM software distributed under the License is distributed on an
@REM "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
@REM KIND, either express or implied.  See the License for the
@REM specific language governing permissions and limitations
@REM under the License.
@REM ----------------------------------------------------------------------------

@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup script, version 3.2.0
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars
@REM MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM       set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@if "%DEBUG%" == "" @echo off
@REM Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set MAVENW_VERBOSE=%MAVENW_VERBOSE%

@REM Also ensure the wrapper jar is set
set MAVENW_JAR=.mvn\wrapper\maven-wrapper.jar

@REM Check if Java is available
if not "%JAVA_HOME%" == "" goto OkJHome
set JAVACMD=java
goto checkJava

:OkJHome
if "%JAVACMD%" == "" set JAVACMD=%JAVA_HOME%\bin\java

:checkJava
"%JAVACMD%" -version >NUL 2>&1
if errorlevel 1 goto javaNotFound

@REM Download the Maven wrapper jar if it doesn't exist
if exist "%MAVENW_JAR%" goto runMaven
call :downloadMavenWrapper
goto runMaven

:javaNotFound
echo Error: JAVA_HOME is not defined correctly.
echo We cannot execute %JAVACMD%
goto error

:downloadMavenWrapper
echo Downloading Maven wrapper...
set MAVENW_REPOURL=https://repo1.maven.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0
if not exist ".mvn\wrapper" mkdir ".mvn\wrapper"
powershell -Command "& {Invoke-WebRequest -Uri '%MAVENW_REPOURL%/maven-wrapper-3.2.0.jar' -OutFile '%MAVENW_JAR%'}"
goto :eof

:runMaven
@REM Run Maven
"%JAVACMD%" ^
  %JVM_CONFIG_MAVEN_PROPS% ^
  %MAVEN_OPTS% ^
  %MAVENW_DEBUG_LEVEL% ^
  -classpath "%MAVENW_JAR%" ^
  "-Dmaven.multiModuleProjectDirectory=%MAVENW_PROJECTBASEDIR%" ^
  %MAVENW_PARAMS% ^
  org.apache.maven.wrapper.MavenWrapperMain ^
  %*

goto :eof

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%

exit /b %ERROR_CODE%